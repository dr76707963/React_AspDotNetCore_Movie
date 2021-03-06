import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import Button from "./Button";
import customConfirm from "./customConfirm";
import GenericList from "./GenericList";
import Pagination from "./Pagination";
import RecordsPerPageSelect from "./RecordsPerPageSelect";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [entites, setEntites] = useState<T[]>();
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, recordsPerPage]);

  function loadData() {
    axios
      .get(props.url, { params: { page, recordsPerPage } })
      .then((response: AxiosResponse<T[]>) => {
        const totalAmountOfRecords = parseInt(
          response.headers["totalamountofrecords"],
          10
        );
        setTotalAmountOfPages(Math.ceil(totalAmountOfRecords / recordsPerPage));
        setEntites(response.data);
      });
  }

  async function deleteEntity(id: number) {
    try {
      await axios.delete(`${props.url}/${id}`);
      loadData();
    } catch (error) {
      if (error && error.response) {
        console.error(error.response.data);
      }
    }
  }
  const buttons = (editUrl:string,id:number) => (
    <>
      <Link className="btn btn-success" to={editUrl}>
        編輯
      </Link>
      <Button
        className="btn btn-danger"
        onClick={() => customConfirm(() => deleteEntity(id))}
        children={"刪除"}
      />
    </>
  );
  return (
    <>
      <h3>{props.title}</h3>
      <Link
        className="btn btn-primary"
        to={props.createURL}
        children={props.entityName}
      />
      <RecordsPerPageSelect
        onChange={(amountOfRecords) => {
          setPage(1);
          setRecordsPerPage(amountOfRecords);
        }}
      />
      <Pagination
        currentPage={page}
        totalAmountOfPages={totalAmountOfPages}
        onChange={(newPage) => setPage(newPage)}
      />

      <GenericList list={entites}>
        <table className="table table-striped">
            {props.children(entites!,buttons)}
        </table>
      </GenericList>
    </>
  );
}
interface indexEntityProps<T> {
    url:string
    title:string
    createURL:string
    entityName:string
    children(entites:T[],buttons:(editUrl:string,id:number)=>ReactElement):ReactElement
}

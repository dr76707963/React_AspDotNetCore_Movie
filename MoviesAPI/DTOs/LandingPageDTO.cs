using MoviesAPI.DTOs.Movie;

namespace MoviesAPI.DTOs
{
    public class LandingPageDTO
    {
        public List<MovieDTO> InTheaters { get; set; }
        public List<MovieDTO> UpcomingReleases { get; set; }
    }
}

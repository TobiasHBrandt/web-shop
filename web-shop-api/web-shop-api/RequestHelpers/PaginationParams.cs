namespace web_shop_api.RequestHelpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 50;

        // it will always get page 1 when make request for list of Product
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 6;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
        }

    }
}

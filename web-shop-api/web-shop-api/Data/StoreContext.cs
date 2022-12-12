using Microsoft.EntityFrameworkCore;
using web_shop_api.Entities;

namespace web_shop_api.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product>? products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
    }
}

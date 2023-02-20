using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web_shop_api.Data;
using web_shop_api.Entities;
using web_shop_api.Extensions;

namespace web_shop_api.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts(string? orderBy, 
            string? searchTerm, string? brands, string? types)
        {
            //store the query in the variable
            var query = _context.products
                .Sort(orderBy)
                .Search(searchTerm)
                .Filter(brands, types)
                .AsQueryable();

            return await query.ToListAsync();
        }

        [HttpGet("{id}")] // api/products/3
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using web_shop_api.Data;
using web_shop_api.Entities;

namespace web_shop_api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _context.products.ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")] // api/products/3
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _context.products.FindAsync(id);
        }

    }
}

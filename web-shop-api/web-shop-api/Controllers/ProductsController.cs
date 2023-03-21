using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using web_shop_api.Data;
using web_shop_api.Entities;
using web_shop_api.Extensions;
using web_shop_api.RequestHelpers;

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
        public async Task<ActionResult<PageList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            //store the query in the variable
            var query = _context.products
                .Sort(productParams.OrderBy)
                .Search(productParams.Search)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            var products = await PageList<Product>.ToPageList(query,
                productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
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

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context.products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

    }
}

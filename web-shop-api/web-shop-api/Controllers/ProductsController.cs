using Microsoft.AspNetCore.Mvc;
using web_shop_api.Data;
using web_shop_api.Entities;

namespace web_shop_api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext context;

        public ProductsController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public ActionResult<List<Product>> GetProducts()
        {
            var products = context.products.ToList();

            return Ok(products);
        }

        [HttpGet("{id}")] // api/products/3
        public ActionResult<Product> GetProduct(int id)
        {
            return context.products.Find(id);
        }

    }
}

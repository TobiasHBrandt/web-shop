using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace web_shop_api.RequestHelpers
{
    public class PageList<T> : List<T> // use this with any entities
    {
        public PageList(List<T> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPage = (int)Math.Ceiling(count / (double)pageSize)
            };
            AddRange(items);
        }

        public MetaData MetaData { get; set; }

        public static async Task<PageList<T>> ToPageList(IQueryable<T> query,
            int pageNumber, int pageSize)
        {
            // get the totalt count from the items
            var count = await query.CountAsync();
            var items = await query.Skip((pageNumber -1) * pageSize).Take(pageSize).ToListAsync();
            return new PageList<T>(items, count, pageNumber, pageSize);
        }
    }
}

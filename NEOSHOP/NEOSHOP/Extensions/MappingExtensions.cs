using NEOSHOP.DTOs;
using NEOSHOP.Models;
using System.Collections.Generic;
using System.Linq;

namespace NEOSHOP.Extensions
{
    public static class MappingExtensions
    {
        public static ProductDTO ToDto(this Product product)
        {
            if (product == null) return null;

            return new ProductDTO
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                ImageUrl = product.ImageUrl,
                CategoryId = product.CategoryId,
                CategoryName = product.Category?.Name,
                Sizes = product.ProductSizes?.Select(ps => new ProductSizeDTO
                {
                    SizeId = ps.SizeId,
                    SizeName = ps.Size?.Name,
                    StockForSize = ps.Stock
                }).ToList(),
                Images = product.ProductImages?.Select(pi => pi.ImageUrl).ToList()
            };
        }

        public static List<ProductDTO> ToDto(this IEnumerable<Product> products)
        {
            return products?.Select(p => p.ToDto()).ToList();
        }

        public static Product ToEntity(this ProductCreateDTO dto)
        {
            if (dto == null) return null;

            return new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                Stock = dto.Stock,
                ImageUrl = dto.ImageUrl,
                CategoryId = dto.CategoryId
            };
        }

        public static Product ToEntity(this ProductUpdateDTO dto, Product existingProduct)
        {
            if (dto == null || existingProduct == null) return existingProduct;

            existingProduct.Name = dto.Name;
            existingProduct.Description = dto.Description;
            existingProduct.Price = dto.Price;
            existingProduct.Stock = dto.Stock;
            existingProduct.ImageUrl = dto.ImageUrl;
            existingProduct.CategoryId = dto.CategoryId;

            return existingProduct;
        }
    }
} 
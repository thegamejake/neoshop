using System;
using System.Threading.Tasks;

namespace NEOSHOP.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        // 添加應用中需要的各種專用Repository
        IRepository<Models.Product> Products { get; }
        IRepository<Models.Category> Categories { get; }
        IRepository<Models.Size> Sizes { get; }
        IRepository<Models.ProductSize> ProductSizes { get; }
        IRepository<Models.ProductImage> ProductImages { get; }
        
        // 保存所有修改
        Task<int> CompleteAsync();
    }
} 
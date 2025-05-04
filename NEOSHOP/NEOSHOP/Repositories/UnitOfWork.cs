using NEOSHOP.Models;
using NEOSHOP.Repositories.Interfaces;
using System;
using System.Threading.Tasks;

namespace NEOSHOP.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly neoshopContext _context;
        private bool disposed = false;

        // 各種Repository
        private IRepository<Product> _productRepository;
        private IRepository<Category> _categoryRepository;
        private IRepository<Size> _sizeRepository;
        private IRepository<ProductSize> _productSizeRepository;
        private IRepository<ProductImage> _productImageRepository;

        public UnitOfWork(neoshopContext context)
        {
            _context = context;
        }

        public IRepository<Product> Products => _productRepository ??= new Repository<Product>(_context);
        public IRepository<Category> Categories => _categoryRepository ??= new Repository<Category>(_context);
        public IRepository<Size> Sizes => _sizeRepository ??= new Repository<Size>(_context);
        public IRepository<ProductSize> ProductSizes => _productSizeRepository ??= new Repository<ProductSize>(_context);
        public IRepository<ProductImage> ProductImages => _productImageRepository ??= new Repository<ProductImage>(_context);

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
} 
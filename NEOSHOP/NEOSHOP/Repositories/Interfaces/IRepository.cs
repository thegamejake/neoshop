using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace NEOSHOP.Repositories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        // 查詢方法
        Task<T> GetByIdAsync(object id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
        
        // 新增方法
        Task AddAsync(T entity);
        Task AddRangeAsync(IEnumerable<T> entities);
        
        // 更新方法
        void Update(T entity);
        
        // 刪除方法
        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entities);
        
        // 持久化
        Task<int> SaveChangesAsync();
    }
} 
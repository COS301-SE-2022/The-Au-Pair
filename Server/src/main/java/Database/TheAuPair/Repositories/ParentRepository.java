package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.Parent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

@Repository
public interface ParentRepository extends MongoRepository<Parent, String>
{
  @Query("{ '_id': ?0 }")
  Parent findUsingId(String id);
}

package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.Parent;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ParentRepository extends MongoRepository<Parent, String>
{
}

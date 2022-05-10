package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.Child;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ChildRepository extends MongoRepository<Child, String>
{

}

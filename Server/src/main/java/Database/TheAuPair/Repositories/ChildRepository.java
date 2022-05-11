package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.Child;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

@Repository
public interface ChildRepository extends MongoRepository<Child, String>
{
}

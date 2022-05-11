package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.medID;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface medAidRepository extends MongoRepository<medID, String>
{
}

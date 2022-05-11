package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.auPair;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface auPairRepository extends MongoRepository<auPair, String>
{
}

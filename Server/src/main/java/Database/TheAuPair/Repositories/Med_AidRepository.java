package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.Med_Aid;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


public interface Med_AidRepository extends MongoRepository<Med_Aid, String>
{

}

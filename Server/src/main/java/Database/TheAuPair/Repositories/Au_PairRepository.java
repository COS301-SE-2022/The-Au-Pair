package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.Au_Pair;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface Au_PairRepository extends MongoRepository<Au_Pair, String>
{

}

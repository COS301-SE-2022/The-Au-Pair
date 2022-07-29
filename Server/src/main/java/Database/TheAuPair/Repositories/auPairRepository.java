package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.auPair;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

@Repository
public interface auPairRepository extends MongoRepository<auPair, String>
{
  @Query("{_id:'?0'}")
  auPair findUsingId(String id);
}

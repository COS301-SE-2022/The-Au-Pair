package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.medAid;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface medAidRepository extends MongoRepository<medAid, String>
{
  @Query("{_id:'?0'}")
  medAid findUsingId(String id);
}

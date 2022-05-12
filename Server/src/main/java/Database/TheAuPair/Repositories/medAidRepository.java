package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.medAid;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface medAidRepository extends MongoRepository<medAid, String>
{
}

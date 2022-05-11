package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ActivityRepository extends MongoRepository<Activity, String>
{
}

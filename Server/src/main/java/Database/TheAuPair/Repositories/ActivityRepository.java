package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.domain.Sort;
import java.util.List;

@Repository
public interface ActivityRepository extends MongoRepository<Activity, String>
{
    @Query("{ '_id': ?0 }")
    Activity findUsingId(String id);

    @Query("{ 'child': ?0 }")
    List<Activity> findAllByChild(String id, Sort sort);
}

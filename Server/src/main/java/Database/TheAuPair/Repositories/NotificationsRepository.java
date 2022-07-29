package Database.TheAuPair.Repositories;

import org.springframework.stereotype.Repository;
import Database.TheAuPair.Models.Notification;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface NotificationsRepository extends MongoRepository<Notification, String> {
    @Query("{ 'parentId': ?0 }")
    List<Notification> findByParentId(String id);

    @Query("{ 'auPairId': ?0 }")
    List<Notification> findByAuPairId(String id);
}

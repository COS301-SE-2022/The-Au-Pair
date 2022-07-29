package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.Child;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

@Repository
public interface ChildRepository extends MongoRepository<Child, String>
{
  @Query("{ 'parent': ?0 }")
  List<Child> findAllByParent(String id);

  @Query("{ 'aupair': ?0 }")
  List<Child> findAllByAuPair(String id);
}

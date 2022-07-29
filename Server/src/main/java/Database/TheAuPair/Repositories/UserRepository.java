package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String>
{
  @Query("{_id:'?0'}")
  User findUsingId(String id);

  @Query("{ $and:[{ 'type': ?0 },{ 'registered': ?1 }] }")
  List<User> findAllByType(int type, boolean registered);
}

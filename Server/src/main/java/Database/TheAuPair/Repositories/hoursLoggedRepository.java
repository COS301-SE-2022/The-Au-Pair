package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.hoursLogged;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

@Repository
public interface hoursLoggedRepository extends MongoRepository<hoursLogged, String>
{
  @Query("{ '_id': ?0 }")
  hoursLogged findUsingId(String id);

  @Query("{ 'user_id': ?0 }")
  List<hoursLogged> findAllByUserId(String userId, Sort sort);

  @Query("$and:[{ 'user_id': ?0 },{ 'date': ?1 }]")
  List<hoursLogged> findAllByUserIdAndDate(String userId, String date, Sort sort);
}

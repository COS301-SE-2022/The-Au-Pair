package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.UserCosts;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

@Repository
public interface UserCostsRepository extends MongoRepository<UserCosts, String> {
  @Query("{_id: '?0'}")
  UserCosts findUsingId(String id);

  @Query("{contributerId: '?0'}")
  List<UserCosts> findAllByUserId(String id, Sort sort);
}

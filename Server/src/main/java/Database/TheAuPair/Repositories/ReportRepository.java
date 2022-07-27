package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.Report;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends MongoRepository<Report, String> {
  @Query("{issuerId:'?0'}")
  List<Report> findUsingAuPairId(String id);
}

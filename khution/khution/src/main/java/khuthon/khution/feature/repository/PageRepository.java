package khuthon.khution.feature.repository;

import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PageRepository extends JpaRepository<Page, Integer> {

    @Query
    User findByPage_id(Integer Page_id);

    @Query
    User findByPage_title(String page_title);
}
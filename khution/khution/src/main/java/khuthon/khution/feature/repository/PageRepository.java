package khuthon.khution.feature.repository;

import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PageRepository extends JpaRepository<Page, Integer> {

    @Query("select u from User u where u.user_id = ?1")
    User findByPage_id(Integer Page_id);

    @Query("select u from User u where u.user_name = ?1")
    User findByPage_title(String page_title);
}
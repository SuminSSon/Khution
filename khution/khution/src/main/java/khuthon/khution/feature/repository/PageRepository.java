package khuthon.khution.feature.repository;

import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PageRepository extends JpaRepository<Page, Integer> {

    @Query
    List<Page> findByUserId(User userId);

    @Query
    Page findByPageId(Integer pageId);
}
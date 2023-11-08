package khuthon.khution.feature.repository;

import khuthon.khution.feature.model.Page;
import khuthon.khution.feature.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {

    @Query
    Quiz findByQuiz_id(Integer Quiz_id);

}

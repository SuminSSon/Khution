package khuthon.khution.feature.service.User;

import khuthon.khution.feature.model.User;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface UserService {

    // 1. 회원가입
    public boolean join(User user);

    // login 기능
    public String login(User user);

    // 2. 유저 정보
    public User userProfile(String id);

    // 관리자 권한 모든 유저 정보
    public List<User> allUserInfo();


}

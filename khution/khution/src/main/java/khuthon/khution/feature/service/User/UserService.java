package khuthon.khution.feature.service.User;

import khuthon.khution.feature.dto.UserDto;
import khuthon.khution.feature.model.User;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface UserService {

    // 1. 회원가입
    public boolean join(UserDto userDto);

    // login 기능
    public boolean login(String userId, String password);

    // 2. 유저 정보
    public UserDto userProfile(String user_id);

    // 관리자 권한 모든 유저 정보
    public List<User> allUserInfo();
}

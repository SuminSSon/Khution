package khuthon.khution.feature.service.User;

import khuthon.khution.feature.dto.UserDto;
import khuthon.khution.feature.model.User;
import khuthon.khution.feature.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private final UserRepository userRepository;

//    @Autowired
//    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    // 1. 회원가입
    @Override
    public boolean join(UserDto userDto){
        if (userRepository.findByUser_id(userDto.getUser_id()) != null) {
            return false;
        } else {
            User user = userDto.toEntity();
            userRepository.save(user); // 데이터베이스에 저장
            return true;
        }
    }

    // 2. 로그인
    public boolean login(String userId, String password){
        if(userRepository.findByUser_idAndUser_password(userId, password) != null){
            return true;
        }
        else return false;
    }

    // 3. 유저 정보 불러오기
    @Override
    public UserDto userProfile(String user_id){
        User user = userRepository.findByUser_id(user_id);

        if (user != null) {
            // 필요한 정보만을 UserDto로 매핑
            UserDto userDto = UserDto.builder()
                    .user_id(user.getUser_id())
                    .user_name(user.getUser_name())
                    // 다른 필요한 정보 추가
                    .build();
            return userDto;
        }
        return null;
    }

    @Override
    public List<User> allUserInfo(){
        return userRepository.findAll();
    }


}

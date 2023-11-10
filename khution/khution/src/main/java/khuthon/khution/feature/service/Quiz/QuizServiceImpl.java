    package khuthon.khution.feature.service.Quiz;


    import khuthon.khution.feature.dto.ChatGptResponseDto;
    import khuthon.khution.feature.dto.PageDto;
    import khuthon.khution.feature.dto.QuizDto;
    import khuthon.khution.feature.model.Message;
    import khuthon.khution.feature.model.Page;
    import khuthon.khution.feature.model.Quiz;
    import khuthon.khution.feature.repository.QuizRepository;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.RequiredArgsConstructor;
    import lombok.Setter;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.http.HttpHeaders;
    import org.springframework.http.HttpMethod;
    import org.springframework.http.RequestEntity;
    import org.springframework.http.ResponseEntity;
    import org.springframework.stereotype.Service;
    import org.springframework.web.client.RestTemplate;
    import org.springframework.web.util.UriComponentsBuilder;

    import java.net.URI;
    import java.util.ArrayList;
    import java.util.List;

    @Service
    @RequiredArgsConstructor
    public class QuizServiceImpl implements QuizService {

        private final QuizRepository quizRepository;

        @Value("${chatGpt.key}")
        private String key;

        private String suffix = "\n위 내용을 바탕으로 객관식 문제 2개, 단답형 문제 2개, OX문제 2개를 만들어 주고 답도 알려줘.\n" +
                "\n" +
                "Desired Format:\n" +
                "객관식 문제:" +
                "Q.<question>\n" +
                "1.<choice>\n" +
                "2.<choice>\n" +
                "3.<choice>\n" +
                "4.<choice>\n" +
                "5.<choice>\n" +
                "A.<answer>\n" +
                "Q.<question>\n" +
                "1.<choice>\n" +
                "2.<choice>\n" +
                "3.<choice>\n" +
                "4.<choice>\n" +
                "5.<choice>\n" +
                "A.<answer>\n" +
                "단답형 문제:" +
                "Q.<question>\n" +
                "A.<answer>\n" +
                "Q.<question>\n" +
                "A.<answer>\n" +
                "OX문제:" +
                "Q.<question>\n" +
                "A.<answer>\n" +
                "Q.<question>\n" +
                "A.<answer>";

        // 1. Quiz 생성
        @Override
        public List<quizInfo> createQuiz(PageDto pageDto) {


            RestTemplate restTemplate = new RestTemplate();
            URI uri = UriComponentsBuilder
                    .fromUriString("https://api.openai.com/v1/chat/completions")
                    .build()
                    .encode()
                    .toUri();

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Authorization", "Bearer " + key);

            ArrayList<Message> list = new ArrayList<>();
            list.add(new Message("user", pageDto.getPage_contents() + this.suffix));

            Body body = new Body("gpt-3.5-turbo", list);

            RequestEntity<Body> httpEntity = new RequestEntity<>(body, httpHeaders, HttpMethod.POST, uri);

            ResponseEntity<ChatGptResponseDto> responseEntity = restTemplate.postForEntity(httpEntity.getUrl(), httpEntity, ChatGptResponseDto.class);

            String[] createdQuiz = responseEntity.getBody().getChoices().get(0).getMessage().getContent().split("\n");

            List<String> questions = new ArrayList<>();
            List<String> answers = new ArrayList<>();
            Integer choicesNum = 1;
            Integer parsedQuestion = 0;

            for (int i = 0; i < createdQuiz.length; i++) {
                if (parsedQuestion >= 0 && parsedQuestion < 2) {
                    if (!createdQuiz[i].isEmpty() && createdQuiz[i].charAt(0) == 'Q') {
                        if (createdQuiz[i].charAt(0) == '.') {
                            String splitKey = "Q.";
                            questions.add(createdQuiz[i].split(splitKey)[1]);
                        } else {
                            String splitKey = "Q" + createdQuiz[i].charAt(1) + ".";
                            questions.add(createdQuiz[i].split(splitKey)[1]);
                        }
                    } else if (!createdQuiz[i].isEmpty() && createdQuiz[i].charAt(0) == 'A') {
                        String splitKey;
                        if (createdQuiz[i].charAt(1) == '.') {
                            splitKey = "A.";
                        } else {
                            splitKey = "A" + createdQuiz[i].charAt(1) + ".";
                        }
                        String splitKey2 = ". ";
                        answers.add(createdQuiz[i].split(splitKey)[1].split(splitKey2)[0]);
                        parsedQuestion++;
                    } else if (!createdQuiz[i].isEmpty() && createdQuiz[i].charAt(0) == Integer.toString(choicesNum).charAt(0)) {
                        String splitKey = Integer.toString(choicesNum) + ".";
                        questions.set(questions.size() - 1, questions.get(questions.size() - 1) + "Choice" + createdQuiz[i]);
                        choicesNum++;
                        if (choicesNum == 6) {
                            choicesNum = 1;
                        }
                    }
                } else if (parsedQuestion >= 2 && parsedQuestion < 4) {
                    if (!createdQuiz[i].isEmpty() && createdQuiz[i].charAt(0) == 'Q') {
                        if (createdQuiz[i].charAt(0) == '.') {
                            String splitKey = "Q.";
                            questions.add(createdQuiz[i].split(splitKey)[1]);
                        } else {
                            String splitKey = "Q" + createdQuiz[i].charAt(1) + ".";
                            questions.add(createdQuiz[i].split(splitKey)[1]);
                        }
                    } else if (!createdQuiz[i].isEmpty() && createdQuiz[i].charAt(0) == 'A') {
                        answers.add(null);
                        parsedQuestion++;
                    }
                } else if (parsedQuestion >= 4 && parsedQuestion < 6) {
                    if (!createdQuiz[i].isEmpty() && createdQuiz[i].charAt(0) == 'Q') {
                        if (createdQuiz[i].charAt(0) == '.') {
                            String splitKey = "Q.";
                            questions.add(createdQuiz[i].split(splitKey)[1]);
                        } else {
                            String splitKey = "Q" + createdQuiz[i].charAt(1) + ".";
                            questions.add(createdQuiz[i].split(splitKey)[1]);
                        }
                    } else if (!createdQuiz[i].isEmpty() && createdQuiz[i].charAt(0) == 'A') {
                        String splitKey;
                        if (createdQuiz[i].charAt(1) == '.') {
                            splitKey = "A.";
                        } else {
                            splitKey = "A" + createdQuiz[i].charAt(1) + ".";
                        }
                        answers.add(createdQuiz[i].split(splitKey)[1]);
                        parsedQuestion++;
                    }
                }
            }

            for (int i = 0; i < questions.size(); i++) {
                System.out.println(i + ":" + questions.get(i));
            }

            for (int i = 0; i < answers.size(); i++) {
                System.out.println(i + ":" + answers.get(i));
            }

            List<quizInfo> result = new ArrayList<>();

            for(int i=0; i< questions.size(); i++) {
                Quiz quiz = new Quiz();
                quiz.setQuizQuestion(questions.get(i));
                quiz.setQuizAnswer(answers.get(i));
                quizRepository.save(quiz);
                quizInfo quizInfo = new quizInfo(quiz.getQuizId(), questions.get(i));
                result.add(quizInfo);
            }

            return result;

        }

        private Quiz saveQuiz(QuizDto quizDto) {
            Quiz quiz = quizDto.toEntity();
            quizRepository.save(quiz);

            return quiz;
        }

        @Override
        public String getAnswer(Integer quiz_id, String user_answer) {
            Quiz quiz = quizRepository.findByQuizId(quiz_id);
            String gptQuery = "question: " + quiz.getQuizQuestion() + "\nanswer: " + user_answer + "\n문제에 대한 답이 맞는 지 답하시오.\n" +
                    "desired format:\n" +
                    "<if correct>맞습니다.\n" +
                    "<if incorrect>틀렸습니다.";
            if (quiz.getQuizAnswer() == null) {
                RestTemplate restTemplate = new RestTemplate();
                URI uri = UriComponentsBuilder
                        .fromUriString("https://api.openai.com/v1/chat/completions")
                        .build()
                        .encode()
                        .toUri();

                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add("Authorization", "Bearer " + key);

                ArrayList<Message> list = new ArrayList<>();
                list.add(new Message("user", gptQuery));

                Body body = new Body("gpt-3.5-turbo", list);

                RequestEntity<Body> httpEntity = new RequestEntity<>(body, httpHeaders, HttpMethod.POST, uri);

                ResponseEntity<ChatGptResponseDto> responseEntity = restTemplate.postForEntity(httpEntity.getUrl(), httpEntity, ChatGptResponseDto.class);

                return responseEntity.getBody().getChoices().get(0).getMessage().getContent();
            } else {
                return quiz.getQuizAnswer();
            }
        }

        @AllArgsConstructor
        @Getter
        @Setter
        static class Body {
            String model;
            List<Message> messages;
        }
    }

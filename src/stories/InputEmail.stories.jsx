import useInput from '../hooks/useInput';
import InputEmail from '../components/InputEmail';

export default {
  title: 'InputEmail',
  component: InputEmail,
  tags: ['autodocs'],
};

const TemplateStory = (args) => {
  const [email, onEmailChange] = useInput(args.email);
  return <InputEmail email={email} onEmailChange={onEmailChange} />;
};

const InputEmailStory = TemplateStory.bind({});
InputEmailStory.args = {
  email: 'tes123@gmail.com',
  onEmailChange: () => {},
};

export { InputEmailStory };

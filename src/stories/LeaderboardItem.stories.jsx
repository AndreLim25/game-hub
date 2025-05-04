import LeaderboardItem from '../components/LeaderboardItem';

export default {
  title: 'LeaderboardItem',
  component: LeaderboardItem,
  tags: ['autodocs'],
};

const TemplateStory = (args) => <LeaderboardItem {...args} />;

const LeaderboardItemStory = TemplateStory.bind({});
LeaderboardItemStory.args = {
  rank: 1,
  name: 'Andre',
  avatar: '/src/stories/assets/profile.png',
  score: 100,
};

export { LeaderboardItemStory };

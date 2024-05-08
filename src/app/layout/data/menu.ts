export const menuOptions = {
  Admin: [
    {
      title: 'Dashboard',
      icon: 'tachometer-alt',
      link: '/dashboard'
    },
    {
      title: 'Classes',
      icon: 'users',
      link: '/class-list'
    },
  ],
  Teacher: [
    {
      title: 'Dashboard',
      icon: 'tachometer-alt',
      link: '/teacher/dashboard'
    },
    {
      title: 'Students',
      icon: 'chalkboard-teacher',
      link: '/teacher/classes'
    },
  ],
  Student: [
    {
      title: 'Dashboard',
      icon: 'tachometer-alt',
      link: 'overview'
    },
    {
      title: 'Assignments',
      icon: 'tasks',
      link: '/student/assignments'
    },
    {
      title: 'Feedback',
      icon: 'comments',
      link: '/student/feedback'
    },
  ]
}

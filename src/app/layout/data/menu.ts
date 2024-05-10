export interface MenuOption {
  title: string,
  icon: string,
  link: string
}

export const menuOptions: {
  [key: string]: MenuOption[]
} = {
  Admin: [
    {
      title: 'Dashboard',
      icon: 'tachometer-alt',
      link: '/dashboard'
    },
  ],
  Teacher: [
    {
      title: 'Dashboard',
      icon: 'tachometer-alt',
      link: '/form/teacherForm/overview'
    },
    {
      title: 'Students',
      icon: 'users',
      link: '/form/teacherForm/students'
    },
  ],
  Student: [
    {
      title: 'Dashboard',
      icon: 'tachometer-alt',
      link: '/student/studentId/overview'
    },
  ]
}

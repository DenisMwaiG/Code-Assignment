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
    {
      title: 'Classes',
      icon: 'chalkboard-teacher',
      link: '/form/4/students'
    },
    {
      title: 'Students',
      icon: 'users',
      link: '/form/4/students'
    },
  ],
  Teacher: [
    {
      title: 'Dashboard',
      icon: 'tachometer-alt',
      link: '/form/4/overview'
    },
    {
      title: 'Students',
      icon: 'users',
      link: '/form/4/students'
    },
  ],
  Student: [
    {
      title: 'Dashboard',
      icon: 'tachometer-alt',
      link: 'overview'
    },
  ]
}

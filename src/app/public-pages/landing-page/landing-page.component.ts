import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  features = [
    {
      title: 'For School Administrators',
      image: 'assets/images/admin_illustration.png',
      points: [
        'Manage classes and students',
        'Track student progress',
        'Insightful reporting',
        'And so much more'
      ]
    },
    {
      title: 'For Teachers',
      image: 'assets/images/teacher_illustration.png',
      points: [
        'Track student progress',
        'Timely feedback for students',
        'Personalized lessons',
        'And so much more'
      ]
    },
    {
      title: 'For Students',
      image: 'assets/images/student_illustration.png',
      points: [
        'Track your progress',
        'Personalized lessons',
        'Access learning resources',
        'Submit assignments'
      ]
    }
  ]

  testimonials = [
    {
      name: 'Tr. Alice',
      school: 'Alliance Girls',
      testimonial: 'Zeraki has been a very good tool for results analysis. It has made tracking of student performance so easy.'
    },
    {
      name: 'Mrs. Davis',
      school: 'School Administrator',
      testimonial: 'Zeraki Analytics has made it easy for me to track student progress and manage classes. I highly recommend it.'
    },
    {
      name: 'Ms. Johnson',
      school: 'Teacher',
      testimonial: 'Personalized lessons through Zeraki improved student engagement. I have seen a significant improvement in my students.'
    },
    {
      name: 'Sarah',
      school: 'Student',
      testimonial: "Zeraki's transparent reporting helped me stay involved in my children's academics."
    }
  ]

}

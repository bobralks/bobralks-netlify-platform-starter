import { defineCollection, z, reference } from "astro:content"
// import type { 
//   CV, 
//   Basics,
//   Work,
//   Volunteer,
//   Education,
//   Awards,
//   Certificates,
//   Publications,
//   Skills,
//   Languages,
//   Interests,
//   References,
//   Projects
// } from "@cv";

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
	}),
});

const work = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
})

// const blog = defineCollection({
//   type: "content",
//   schema: ({ image }) => z.object({
//     title: z.string(),
//     summary: z.string(),
//     date: z.coerce.date(),
//     tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
//       message: 'tags must be unique',
//     }),
//     draft: z.boolean().optional(),
//     image: image().optional(),
//   }),
// })

const places = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    summary: z.string(),
    location: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
      message: 'tags must be unique',
    }),
    draft: z.boolean().optional(),
    image: image(),
  }),
})

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
  }),
})

const legal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

const hosts = defineCollection({
  type: "content",
  schema: ({ image }) =>
  z.object({
    name: z.string(),
    description: z.string(),
    bio: z.string().optional(),
    image: image(),
    draft: z.boolean().optional(),
    title: z.string().optional(),
    airbnbHostLink: z.string().optional(),
    airbnbPicsLink: z.string().optional(),
    airbnbProfileLink: z.string().optional(),
    airbnbReviewsLink: z.string().optional(),
    airbnbRatingCount: z.number().optional(),
    airbnbReviewsCount: z.number().optional(),
    airbnbRating: z.number().optional(),
    airbnbYearsHosting: z.number().optional(),
    airbnbMyWork: z.string().optional(),
    airbnbLanguagesSpoken: z.string().optional(),
    airbnbWhereILive: z.string().optional(),
  }),
});

const listings = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      summary: z.string().optional(),
      location: z.string().optional(),
      date: z.coerce.date(),
      image: image(),
      host: reference("hosts"),
      tags: z.array(z.string()),
      draft: z.boolean().optional().default(false),
      pubDate: z.coerce.date().optional(),
      relatedListings: z.array(reference("listings")).optional(),
    }),
});

const reviews = defineCollection({
  type: "data",
  schema: z.object({
    reviewer: z.string(),
    reviewer_avatar: z.string(),
    listing: reference("listings"),
    rating: z.coerce.number(),
    text: z.string().optional(),
    datetime: z.coerce.date(),
    language: z.string(),
    url: z.string(),
  }),
});

const resumes = defineCollection({
  type: "data",
  schema: ({ image }) => z.object({
    basics: z.object({
      name: z.string(),
      label: z.string(),
      image: image(),
      email: z.string(),
      phone: z.string(),
      url: z.string().optional(),
      summary: z.string(),
      location: z.object({
        address: z.string(),
        postalCode: z.string(),
        city: z.string(),
        countryCode: z.string(),
        region: z.string(),
      })
    }),
    profiles: z.array(z.object({
      network: z.string(),
      username: z.string(),
      url: z.string(),
    })).optional(),
    work: z.array(z.object({
      name: z.string(),
      position: z.string(),
      url: z.string().optional(),
      startDate: z.string(),
      endDate: z.string().optional(),
      summary: z.string(),
      highlights: z.array(z.string()),
    })).optional(),
    volunteer: z.array(z.object({
      organization: z.string(),
      position: z.string(),
      url: z.string().optional(),
      startDate: z.string(),
      endDate: z.string().optional(),
      summary: z.string(),
      highlights: z.array(z.string()),
    })).optional(),
    education: z.array(z.object({
      institution: z.string(),
      area: z.string(),
      studyType: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      score: z.string(),
      courses: z.array(z.string()),
    })).optional(),
    awards: z.array(z.object({
      title: z.string(),
      date: z.string(),
      awarder: z.string(),
      summary: z.string(),
    })).optional(),
    certificates: z.array(z.object({
        name: z.string(),
        date: z.string(),
        issuer: z.string(),
        url: z.string(),
      })).optional(),
    publications: z.array(z.object({
      name: z.string(),
      publisher: z.string(),
      releaseDate: z.string(),
      url: z.string().optional(),
      summary: z.string(),
    })).optional(),
    skills: z.array(z.object({
      name: z.string(),
      level: z.string(),
      keywords: z.array(z.string()),
    })).optional(),
    languages: z.array(z.object({
      language: z.string(),
      fluency: z.string(),
    })).optional(),
    interests: z.array(z.object({
      name: z.string(),
      keywords: z.array(z.string()),
    })).optional(),
    references: z.array(z.object({
      name: z.string(),
      reference: z.string(),
    })).optional(),
    projects: z.array(z.object({
      name: z.string(),
      description: z.string(),
      highlights: z.array(z.string()),
      keywords: z.array(z.string()).optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })).optional(),
  }),
});

// import type { 
//   CV, 
//   Basics,
//   Work,
//   Volunteer,
//   Education,
//   Awards,
//   Certificates,
//   Publications,
//   Skills,
//   Languages,
//   Interests,
//   References,
//   Projects
// } from "@cv";

// type Booking = {
//   title: Annette Webel (Studio- 12/20 - 12/27)
// description: Booking.com
// name: Annette Webel
// listing: the-cozy-studio
// start: 2024-12-20T12:24
// end: 2024-12-27T12:24
// reference: S241220122724
// image: "@assets/images/bookings/cottage.jpg"
//   reference: string;
//   listing: string;
//   name: string;
//   email?: string;
//   phone?: string;
//   start: string;
//   end: string;
// }

const bookings = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      name: z.string(),
      email: z.string().optional(),
      phone: z.string().optional(),
      listing: reference("listings"), 
      start: z.coerce.date(),
      end: z.coerce.date(),
      numGuests: z.number().optional(),
      bookedThrough: z.string().optional(),
      bookedDate: z.coerce.date().optional(),
      checkedIn: z.boolean().optional().default(false),
      checkedOut: z.boolean().optional().default(false),
      reference: z.string(),
      status: z.string(),
      // notes: z.string().optional(),
      // image: image().default("@assets/images/bookings/default.png"),
      image: image(),

      // url: z.string().url(),
      // featured: z.number().min(1).optional(),
    }),
});

const users = defineCollection({
	schema: ({ image }) =>
		z.object({
			// id: z.string(),
			name: z.string(),
			image: image(),
		}),
});

const pets = defineCollection({
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			image: image(),
		}),
});

const animals = defineCollection({
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			image: image(),
		}),
});

const features = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    frontPage: z.boolean(),
    sortOrder: z.number(),
  }),
});

export const collections = { listings, bookings, hosts, reviews, places, blog, work, projects, legal, users, features, pets, animals, resumes }

/**
 * Media Items Configuration
 * 
 * Add your media items here. Each item should have:
 * - id: Unique identifier
 * - type: "image" or "video"
 * - url: Path to the media file
 * - correctAnswer: "AI" or "Real"
 * - description: Optional description shown to users
 */

export const mediaItems = [
    {
        id: "media_1",
        type: "video",
        url: "/media/sample1.mp4",
        correctAnswer: "Real",
        description: "Door Camera Footage"
    },
    {
        id: "media_2",
        type: "image",
        url: "/media/sample2.jpg",
        correctAnswer: "AI",
        description: "Portrait Photo"
    },
    {
        id: "media_3",
        type: "video",
        url: "/media/sample3.mp4",
        correctAnswer: "AI",
        description: "Street Scene"
    },
    {
        id: "media_4",
        type: "image",
        url: "/media/sample4.jpg",
        correctAnswer: "Real",
        description: "Landscape Photo"
    },
    {
        id: "media_5",
        type: "video",
        url: "/media/sample5.mp4",
        correctAnswer: "Real",
        description: "Nature Clip"
    },
    {
        id: "media_6",
        type: "image",
        url: "/media/sample6.jpg",
        correctAnswer: "AI",
        description: "Digital Art"
    }
];

// Total number of media items for routing
export const TOTAL_MEDIA_ITEMS = mediaItems.length;

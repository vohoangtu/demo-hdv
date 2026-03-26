import { HDV, Tour, Settlement, Notification } from './types';

export const MOCK_HDVS: HDV[] = [
  {
    id: 'HDV-2024-001',
    name: 'Nguyễn Minh Quân',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDngzSBUik4zjY5ek6YPZIhtwZQW3GxTXOWYMhX2InU9AjUsJNv6qCsVvm1tZ3z5DsFU-Qxkck5Q64_yoCpUxEiot_5zSS9fnzEa-bCLYCF4YgWhrgPdbHNvR27l3hHltJIa3wZ-UoLlShZ5ftfICNos76O2Yq_fujk8eSqgrdMWQmYHO4jzOz19TWgzqtRHIXcgVJootU0i8bYDP11CSVytLEeN7pKALFnFnDGtWH6KWiywB-GyZlYEQoNSG-yIJgtQnIKuu1swEkR',
    type: 'Fulltime',
    branch: 'Hà Nội HQ',
    baseLocation: 'Hà Nội',
    status: 'Active',
    languages: ['EN', 'JP'],
    routes: ['Vòng cung Tây Bắc', 'Hà Nội City'],
    rating: 5.0,
    completedTours: 142,
    operationalScore: 95,
    phone: '091 234 5678',
    email: 'quan.nm@guideops.vn',
    idNumber: '001095001234',
    skills: ['Lái xe', 'Sơ cứu', 'Team building'],
    certifications: ['Thẻ HDV Quốc tế', 'Chứng chỉ Sơ cấp cứu Red Cross'],
    tourHistory: [
      { id: 'T-2024-001', name: 'Hà Nội City Tour', date: '12/03/2026', rating: 5, status: 'Completed' },
      { id: 'T-2024-005', name: 'Ninh Bình Bái Đính', date: '05/03/2026', rating: 4.8, status: 'Completed' },
      { id: 'T-2024-012', name: 'Hạ Long 2 Ngày', date: '20/02/2026', rating: 5, status: 'Completed' },
    ]
  },
  {
    id: 'HDV-2024-042',
    name: 'Trần Thu Hà',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs3UZa-8vwBcRfb8aiNwCkBRuVnOCDqI8NqNAi8eEdWIGyObj-dr4ldhgTs6l_AEBtzg55uhUJIXLybLzqcNeOHFebKfaGi3PzZjCsOzQZwsJKTy1GZZSbTLf3UovXv2zo73N3CViOvhEXEuwexTUVEOF6FjkCj8ljKTXfMfEqsaiRCCZSFrzphmMJV0K09L3hUhVZhQnj1e9t0bucs8faZGXdvVxYvywyHVdogfy54GTVZPonvVdNOQyGhKmdXqj-k9Mdl65XhBIV',
    type: 'Collaborator',
    branch: 'Đà Nẵng Br.',
    baseLocation: 'Đà Nẵng',
    status: 'Pending',
    languages: ['FR', 'EN'],
    routes: ['Phố cổ Hội An', 'Bà Nà Hills'],
    rating: 4.2,
    completedTours: 78,
    operationalScore: 78,
    phone: '098 111 2222',
    email: 'ha.tt@guideops.vn',
    idNumber: '048092005678',
    skills: ['Nấu ăn', 'Chụp ảnh'],
    certifications: ['Thẻ HDV Nội địa'],
    tourHistory: [
      { id: 'T-2024-022', name: 'Hội An Walking Tour', date: '10/03/2026', rating: 4.5, status: 'Completed' },
      { id: 'T-2024-030', name: 'Bà Nà Hills Day', date: '01/03/2026', rating: 4.0, status: 'Completed' },
    ]
  },
  {
    id: 'HDV-2023-112',
    name: 'Lê Hoàng Nam',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMyoytHXW7dhhhgGG0Kaz-6ErNVltNFEO76B2shsSui6_Qb_EpH1Wsbb2gQwiUg_P3CqgubVGmgLHKqYa5nUrjklfe7jZ-9EE4PYgDkfoJ9XF2u50yY1hoWzxJ1JYFkK-GaLv75bfhy5QtOkY48tsfyK21_o_5UHZq1ua7j8X1_BD7eIbJOlLk0MGcXwLkX9-U8zFmiCDMGbSPvT_A4l6Jlmk2hQUQxsN3nqcN-Kz0rrHZ9O8WgoUzVAmlF6qkDm4c7Dy8itYBrJH9',
    type: 'Fulltime',
    branch: 'TP. HCM Br.',
    baseLocation: 'TP. HCM',
    status: 'Blocked',
    languages: ['CN'],
    routes: ['Mekong Delta', 'Củ Chi Tunnels'],
    rating: 3.1,
    completedTours: 45,
    operationalScore: 45,
    phone: '090 333 4444',
    email: 'nam.lh@guideops.vn',
    idNumber: '079088009999',
    skills: ['Võ thuật'],
    certifications: ['Chứng chỉ ngoại ngữ HSK 6'],
    tourHistory: []
  },
  {
    id: 'HDV-2024-088',
    name: 'Phạm Khánh Linh',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_15y6V6w1s3ZoDwoe4iiV9jnY_kdG1lrIts1GOI1lQ8ytgueXwoPIFjAFZ0mxE3wF1eEuSnO-F8eAWnXaCzT7fz-UbJW1x8bmBQRUKy8PqxZUx3BEhOJA2kKjaDmU5xt47weRKG_a_Mvd2CMnX-h17SeuaJjQFllnXx0p1-UWDjB8_BfigVqwl6zuv72MstKrcv2ZXMexbEA1huyrqu8jKbZG14ars3Ph0kfasjsYxCs3CGUjJACNYNDJwjzng-f9i6xXjoT6VeWI',
    type: 'Collaborator',
    branch: 'Hà Nội HQ',
    baseLocation: 'Hà Nội',
    status: 'Active',
    languages: ['KR', 'EN'],
    routes: ['Hạ Long Bay', 'Ninh Bình'],
    rating: 4.6,
    completedTours: 88,
    operationalScore: 88,
    phone: '097 555 6666',
    email: 'linh.pk@guideops.vn',
    idNumber: '001096007777',
    skills: ['Dịch thuật', 'Quản lý đoàn'],
    certifications: ['Thẻ HDV Quốc tế'],
    tourHistory: [
      { id: 'T-2024-045', name: 'Hạ Long Luxury Cruise', date: '15/03/2026', rating: 4.8, status: 'Completed' },
    ]
  },
  {
    id: 'HDV-ALEX',
    name: 'Alex Nguyen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_l4lfnxt4nbGA3NIXhjK6dScRZj6gpOtuAh8tr6fT0TNhReUPJJnzLKViDGURWfyndOarj8R11bVhSoZze8ijnBLeacaXUK1gHhMqiysr4skJyP6MBDHTZKGLzB48ymiYMAleFhxekfaiz1HkDjrrRd4Vk97farxxcc1dWTG-d7mfcjUCSd8TpK6k8yUoOhkVkKb_k17PtYsknFds77t7F_GGggKjH-ok3Q4OMMsxRURvYIuwMMQ7pL8tNBDdX-yIdzIB8OVfAkmt',
    type: 'Fulltime',
    branch: 'Hà Nội Branch',
    baseLocation: 'Hà Nội',
    status: 'Active',
    languages: ['EN', 'CN'],
    routes: ['Tây Bắc', 'Đông Bắc', 'Inbound China'],
    rating: 4.92,
    completedTours: 124,
    operationalScore: 92,
    phone: '098 765 4321',
    email: 'an.nv@guideops.vn',
    idNumber: '001092003841',
    skills: ['Lái xe 16 chỗ', 'Sơ cứu nâng cao'],
    certifications: ['Thẻ HDV Quốc tế', 'Bằng lái xe hạng D'],
    tourHistory: [
      { id: 'T-2024-060', name: 'Xuyên Việt 14 Ngày', date: '01/03/2026', rating: 5, status: 'Completed' },
      { id: 'T-2024-072', name: 'Tây Bắc Mùa Lúa Chín', date: '15/02/2026', rating: 4.9, status: 'Completed' },
    ]
  }
];

export const MOCK_TOURS: Tour[] = [
  {
    id: 'VN-DNG-7732',
    name: 'Đà Nẵng - Hội An - Ngũ Hành Sơn',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh2e3EBY0nRRxaJ9q8zpaz_8VZIrAtFthhNI6PSCQIot0lIa3fT_474igtkxBstQ7wDMUZP3omsFmq_Jz_Tu2YHhVw8tkH8hCYB4Uq0kos9nbZG571Xgoa3WDaIFAG9S_tUlGghpd71aOQTzxCCWSLHjDe5w_GOAHOtxdUIvTb9BV49grp-I8XZYQysoMWtUBlyYdISHGYbFpBtmaCotJrICjUzoWMkkOicz7hRceJmR2cMYZ_01ie84MlXt28aG-mUZ0Zja62oxIK',
    startDate: '24/10',
    endDate: '27/10',
    duration: '4 Ngày 3 Đêm',
    guests: 24,
    guestType: 'Inbound',
    language: 'Tiếng Anh (US)',
    location: 'Đà Nẵng',
    status: 'Pending',
    priority: 'High',
    budget: 12500000,
    itinerary: [
      'Ngày 1: Đón khách tại sân bay Đà Nẵng, tham quan Ngũ Hành Sơn.',
      'Ngày 2: Tham quan Bà Nà Hills, ăn trưa buffet.',
      'Ngày 3: Tham quan Phố cổ Hội An, thả đèn hoa đăng.',
      'Ngày 4: Mua sắm tại chợ Hàn, tiễn khách ra sân bay.'
    ],
    operatorContact: {
      name: 'Trần Minh Tuấn',
      phone: '090 555 1234',
      email: 'tuan.tm@travelops.vn'
    },
    notes: 'Khách yêu cầu thực đơn không có hải sản cho 2 người.'
  },
  {
    id: 'VN-SGN-4410',
    name: 'City Tour Sài Gòn - Củ Chi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgag826ea5i5MA-I2_j5t_-pmVH0V_bUfAmPN97iDLPusqxzkwaKWEppPsaGVHipUAys3Atfb2m_MPR3PvolpOD3EHIf1Sng4ytvNY67xuDHlvbtXj2Fj-yzJlzvObVRBh5EPYdxfuIfB2QYodQUkodq03M-eOtH3-brfidUSc97Ro48D45bu95niCH-2ZE-gVcM-5lIHnuLMGkKKau9j-BvavKbVDg89vLeqyDOfczhDnGp2Hw9JSA1gCSZmOrFrA6RD6lRbZDZ_r',
    startDate: '25/10',
    endDate: '25/10',
    duration: '1 Ngày',
    guests: 15,
    guestType: 'Domestic',
    language: 'Tiếng Trung',
    location: 'TP. HCM',
    status: 'Pending',
    priority: 'Standard',
    assignedHDV: 'HDV-2024-001',
    itinerary: [
      '08:00: Đón khách tại khách sạn.',
      '09:30: Tham quan Địa đạo Củ Chi.',
      '12:00: Ăn trưa đặc sản địa phương.',
      '14:00: Tham quan Dinh Độc Lập, Nhà thờ Đức Bà.',
      '17:00: Trả khách tại khách sạn.'
    ],
    operatorContact: {
      name: 'Lê Thị Hồng',
      phone: '091 222 3333',
      email: 'hong.lt@travelops.vn'
    }
  },
  {
    id: 'VN-SP-2024-001',
    name: 'Hành trình Xuyên Việt: Hà Nội - Sapa',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6XLNH_NbgaM4R_J46yoh9TP8OuJkUfN0VlTCwb1FgjtGOu5uE87ovBlLU_f3OIisbtnXLmDQ_f0cHJ6kUhv0Yo2o3u7C3AgFJ2ADxmkf_Es9MTuo2YBvWSu3j2gIw0OMuXbTd3T5FLdxl9ESEy6R0qxKvQdLcQykphENNTj3ENMxkx8k_ajoi8Doda72OAFmRO0__Z1sA5wO5f89R9dRXj3xBHxb2TJhTcYUDayYUBOonRFn9tNwfNThfVsJjNHA2Z5bNh35l5A1f',
    startDate: 'Hôm nay',
    endDate: '20/10',
    duration: '3 Ngày 2 Đêm',
    guests: 12,
    guestType: 'Inbound',
    language: 'Tiếng Anh',
    location: 'Hà Nội',
    status: 'Live',
    priority: 'Urgent',
    itinerary: [
      'Ngày 1: Hà Nội - Sapa, tham quan bản Cát Cát.',
      'Ngày 2: Chinh phục đỉnh Fansipan bằng cáp treo.',
      'Ngày 3: Tham quan bản Tả Phìn, mua sắm thổ cẩm, về Hà Nội.'
    ],
    operatorContact: {
      name: 'Nguyễn Văn Hùng',
      phone: '098 777 8888',
      email: 'hung.nv@travelops.vn'
    }
  },
  {
    id: 'VN-HAN-1102',
    name: 'Hà Nội - Hạ Long - Ninh Bình',
    image: 'https://picsum.photos/seed/halong/800/600',
    startDate: '28/10',
    endDate: '31/10',
    duration: '4 Ngày 3 Đêm',
    guests: 30,
    guestType: 'Inbound',
    language: 'Tiếng Hàn',
    location: 'Hà Nội',
    status: 'Pending',
    priority: 'High'
  },
  {
    id: 'VN-HUE-5566',
    name: 'Cố đô Huế - Di sản miền Trung',
    image: 'https://picsum.photos/seed/hue/800/600',
    startDate: '30/10',
    endDate: '01/11',
    duration: '3 Ngày 2 Đêm',
    guests: 18,
    guestType: 'Domestic',
    language: 'Tiếng Việt',
    location: 'Huế',
    status: 'Pending',
    priority: 'Standard',
    assignedHDV: 'HDV-2024-042'
  }
];

export const MOCK_SETTLEMENTS: Settlement[] = [
  {
    id: '#TR-2026-0892',
    tourId: 'VN-SGN-2026-0892',
    hdvName: 'Nguyễn Văn An',
    date: '15/03/2026',
    expenses: 8450000,
    bonus: 500000,
    advance: 0,
    total: 9250000,
    status: 'Pending Review',
    items: [
      { category: 'Di chuyển', amount: 2500000, description: 'Thuê xe 16 chỗ đón khách' },
      { category: 'Ăn uống', amount: 4200000, description: 'Bữa trưa + tối đoàn 12 khách' },
      { category: 'Vé tham quan', amount: 1750000, description: 'Vé vào cổng Dinh Độc Lập' },
    ],
    notes: 'Đoàn rất hài lòng, khách có tip thêm cho HDV.',
    approvalHistory: [
      { id: '1', action: 'Submit', role: 'Guide', user: 'Nguyễn Văn An', date: '15/03/2026', comment: 'Gửi quyết toán tour Sài Gòn' },
      { id: '2', action: 'Approve', role: 'Finance', user: 'Trần Tài Chính', date: '16/03/2026', comment: 'Chứng từ hợp lệ' },
    ]
  },
  {
    id: '#TR-2026-0871',
    tourId: 'VN-SGN-2026-0871',
    hdvName: 'Trần Thị Bích',
    date: '14/03/2026',
    expenses: 12100000,
    bonus: -200000,
    advance: 0,
    total: 12350000,
    status: 'Pending Audit',
    items: [
      { category: 'Khách sạn', amount: 8000000, description: 'Phòng nghỉ 2 đêm tại Rex Hotel' },
      { category: 'Di chuyển', amount: 3100000, description: 'Xăng dầu + phí cầu đường' },
      { category: 'Khác', amount: 1000000, description: 'Mua nước uống + khăn lạnh' },
    ],
    notes: 'Bị mất biên lai tiền nước uống 200k nên bị trừ vào bonus.',
    approvalHistory: [
      { id: '1', action: 'Submit', role: 'Guide', user: 'Trần Thị Bích', date: '14/03/2026', comment: 'Quyết toán tour Sài Gòn 3 ngày' },
    ]
  },
  {
    id: '#TR-2026-0912',
    tourId: 'VN-HAN-2026-0912',
    hdvName: 'Lê Hoàng Nam',
    date: '10/03/2026',
    expenses: 5600000,
    bonus: 0,
    advance: 0,
    total: 5600000,
    status: 'Settled',
    items: [
      { category: 'Ăn uống', amount: 3000000, description: 'Bữa trưa buffet Sen Tây Hồ' },
      { category: 'Vé tham quan', amount: 2600000, description: 'Vé xem show Tinh Hoa Bắc Bộ' },
    ],
    approvalHistory: [
      { id: '1', action: 'Submit', role: 'Guide', user: 'Lê Hoàng Nam', date: '10/03/2026' },
      { id: '2', action: 'Approve', role: 'Finance', user: 'Trần Tài Chính', date: '11/03/2026' },
      { id: '3', action: 'Approve', role: 'Admin', user: 'Nguyễn Quản Lý', date: '12/03/2026', comment: 'Đã thanh toán qua ngân hàng' },
    ]
  },
  {
    id: '#TR-2026-0945',
    tourId: 'VN-DAD-2026-0945',
    hdvName: 'Phạm Khánh Linh',
    date: '08/03/2026',
    expenses: 15400000,
    bonus: 1000000,
    advance: 0,
    total: 16400000,
    status: 'Settled',
    items: [
      { category: 'Di chuyển', amount: 5000000, description: 'Vé cáp treo Bà Nà Hills' },
      { category: 'Khách sạn', amount: 10400000, description: 'Resort 4 sao Đà Nẵng' },
    ]
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Tour mới được phân công',
    message: 'Bạn đã được phân công cho tour "Đà Nẵng - Hội An" khởi hành ngày 24/10.',
    type: 'info',
    timestamp: '2026-03-26T09:00:00Z',
    isRead: false,
    link: '/tours'
  },
  {
    id: '2',
    title: 'Quyết toán đã được duyệt',
    message: 'Yêu cầu quyết toán #TR-2026-0892 đã được phê duyệt thành công.',
    type: 'success',
    timestamp: '2026-03-26T08:30:00Z',
    isRead: true,
    link: '/settlement'
  },
  {
    id: '3',
    title: 'Cảnh báo chứng chỉ hết hạn',
    message: 'Chứng chỉ "Sơ cấp cứu Red Cross" của bạn sẽ hết hạn trong 30 ngày tới.',
    type: 'warning',
    timestamp: '2026-03-25T15:00:00Z',
    isRead: false,
    link: '/hdv'
  },
  {
    id: '4',
    title: 'Yêu cầu bổ sung thông tin',
    message: 'Admin yêu cầu bổ sung chứng từ cho tour "Hà Nội City Tour".',
    type: 'error',
    timestamp: '2026-03-25T10:00:00Z',
    isRead: false,
    link: '/settlement'
  }
];

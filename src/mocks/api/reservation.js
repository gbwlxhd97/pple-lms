const getTimes = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      am: [
        {
          time: '10:00',
          able: true,
        },
        {
          time: '10:30',
          able: true,
        },
        {
          time: '11:00',
          able: true,
        },
        {
          time: '11:30',
          able: false,
        },
      ],
      pm: [
        {
          time: '12:00',
          able: true,
        },
        {
          time: '12:30',
          able: true,
        },
        {
          time: '1:00',
          able: true,
        },
        {
          time: '2:00',
          able: false,
        },
      ],
    })
  );
};

const getTodos = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      pm: [
        {
          time: '12:00',
          able: true,
        },
        {
          time: '12:30',
          able: true,
        },
        {
          time: '1:00',
          able: true,
        },
        {
          time: '2:00',
          able: false,
        },
      ],
    })
  );
};

export const reservationAPIList = {
  getTimes,
  getTodos,
};

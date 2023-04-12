// Generate unique ID for eact workout
const createId = (workout) => {
    let id;

    if (workout.length) {
        const ids = workout.map((w) => w.id);

        ids.sort((a,b) => a-b);

        id = ids[ids.length -1] +1;
    } else {
        id =1;
    }

    return id;
};

export default createId;
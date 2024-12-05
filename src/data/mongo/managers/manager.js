class Manager {

    constructor(model) {
        this.model = model
    }

    create = async (data) => {
        try {
            const one = await this.model.create(data)
            return one
        } catch (error) {
            throw error
        }
    }

    readByEmail = async (email) => {
        try {
            const one = await this.model.findOne({ email }).lean()            
            return one
        } catch (error) {
            throw error
        }
    }

    readById = async (id) => {
        try {
            const one = await this.model.findOne({ _id: id }).lean()
            return one
        } catch (error) {
            throw error
        }
    }

    read = async (data) => {
        try {
            const all = await this.model.find(data).lean()
            return all
        } catch (error) {
            throw error
        }
    }

    update = async (id, data) => {
        try {
            const opt = { new: true }
            const one = await this.model.findByIdAndUpdate(id, data, opt)
            return one
        } catch (error) {
            throw error
        }
    }

    destroy = async (id) => {
        try {
            const one = await this.model.findByIdAndDelete(id)
            return one
        } catch (error) {
            throw error
        }
    }

}

export default Manager
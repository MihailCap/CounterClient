import { CountersApiFactory, type CounterDto, type CountersApiInterface } from '../client/api';
import { Configuration } from '../client/configuration';

export class CounterService {

  private getCounterClient(): CountersApiInterface {
    return CountersApiFactory(new Configuration({basePath: "http://localhost:5053"}));
    }

  async create(counterName: string): Promise<CounterDto | null> {
    try {
      const response = await this.getCounterClient().createCounter(counterName)
      return response.data
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  async get(counterName: string): Promise<CounterDto | null> {
    try {
      const response = await this.getCounterClient().getCounterByName(counterName)
      return response.data
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  async getAll(): Promise<CounterDto[] | null> {
    try {
      const response = await this.getCounterClient().getAllCounters()
      return response.data
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  async increment(counterName: string): Promise<CounterDto | null> {
    try {
      const response = await this.getCounterClient().incrementCounter(counterName)
      return response.data
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  async decrement(counterName: string): Promise<CounterDto | null> {
    try {
      const response = await this.getCounterClient().decrementCounter(counterName)
      return response.data
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  async reset(counterName: string): Promise<CounterDto | null> {
    try {
      const response = await this.getCounterClient().resetCounter(counterName)
      return response.data
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  async remove(counterName: string): Promise<boolean | null> {
    try {
      const response = await this.getCounterClient().deleteCounter(counterName)
      return response.data
      return response.data
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }

  async update(counterName: string, Dto: CounterDto): Promise<CounterDto | null> {
    try {
      const response = await this.getCounterClient().updateCounter(counterName, Dto)
      return response.data
    } catch (error) {
      console.error('Error:', error)
      return null
    }
  }
}
